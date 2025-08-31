// Simple Waitlist Backend for HormonCode Landing Page
// This can be deployed on Vercel, Netlify Functions, or any Node.js host

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: ['https://hormoncode.com', 'https://www.hormoncode.com', 'http://localhost:8080'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Simple file-based storage (for MVP - later use database)
const WAITLIST_FILE = path.join(__dirname, 'waitlist-data.json');

// Ensure data file exists
if (!fs.existsSync(WAITLIST_FILE)) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readWaitlist = () => {
  try {
    const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading waitlist:', error);
    return [];
  }
};

const writeWaitlist = (data) => {
  try {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing waitlist:', error);
    return false;
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// API Routes

// POST /api/waitlist - Add someone to waitlist
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, firstName, age, interests, newsletter, source } = req.body;

    // Validation
    if (!email || !firstName) {
      return res.status(400).json({
        error: 'Email and firstName are required',
        code: 'MISSING_FIELDS'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      });
    }

    // Read current waitlist
    const waitlist = readWaitlist();

    // Check if email already exists
    const existingEntry = waitlist.find(entry => entry.email.toLowerCase() === email.toLowerCase());
    if (existingEntry) {
      return res.status(409).json({
        error: 'Email already registered',
        code: 'EMAIL_EXISTS',
        existingEntry: {
          id: existingEntry.id,
          email: existingEntry.email,
          firstName: existingEntry.firstName,
          signupDate: existingEntry.signupDate
        }
      });
    }

    // Create new entry
    const newEntry = {
      id: generateId(),
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      age: age || null,
      interests: interests || null,
      newsletter: newsletter === true,
      source: source || 'landing-page',
      signupDate: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'unknown'
    };

    // Add to waitlist
    waitlist.push(newEntry);

    // Save to file
    const saved = writeWaitlist(waitlist);
    if (!saved) {
      throw new Error('Failed to save waitlist data');
    }

    // Log successful signup
    console.log(`New waitlist signup: ${email} (${firstName}) - Total: ${waitlist.length}`);

    // Return success
    res.status(201).json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: newEntry.id,
        email: newEntry.email,
        firstName: newEntry.firstName,
        position: waitlist.length,
        signupDate: newEntry.signupDate
      }
    });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
});

// GET /api/waitlist/stats - Get waitlist statistics
app.get('/api/waitlist/stats', (req, res) => {
  try {
    const waitlist = readWaitlist();
    
    const stats = {
      totalSignups: waitlist.length,
      signupsToday: waitlist.filter(entry => {
        const today = new Date().toDateString();
        const entryDate = new Date(entry.signupDate).toDateString();
        return today === entryDate;
      }).length,
      signupsThisWeek: waitlist.filter(entry => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(entry.signupDate) > weekAgo;
      }).length,
      ageDistribution: {},
      interestDistribution: {},
      sourceDistribution: {}
    };

    // Calculate distributions
    waitlist.forEach(entry => {
      // Age distribution
      if (entry.age) {
        stats.ageDistribution[entry.age] = (stats.ageDistribution[entry.age] || 0) + 1;
      }

      // Interest distribution
      if (entry.interests) {
        // Group custom interests under "Custom/Other"
        const standardInterests = [
          'hormone-balance', 'weight-management', 'energy-boost', 
          'sleep-improvement', 'mood-support', 'nutrition-guidance',
          'skin-health', 'fitness-support', 'stress-management'
        ];
        
        const interestKey = standardInterests.includes(entry.interests) 
          ? entry.interests 
          : 'custom-other';
          
        stats.interestDistribution[interestKey] = (stats.interestDistribution[interestKey] || 0) + 1;
      }

      // Source distribution
      stats.sourceDistribution[entry.source] = (stats.sourceDistribution[entry.source] || 0) + 1;
    });

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      error: 'Failed to get stats',
      code: 'STATS_ERROR'
    });
  }
});

// GET /api/waitlist/export - Export waitlist (admin only)
app.get('/api/waitlist/export', (req, res) => {
  try {
    const adminKey = req.query.key;
    
    // Simple admin authentication (use environment variable in production)
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'hormoncode_admin_2024') {
      return res.status(401).json({
        error: 'Unauthorized',
        code: 'INVALID_ADMIN_KEY'
      });
    }

    const waitlist = readWaitlist();
    
    // Create CSV content
    const csvHeader = 'ID,Email,FirstName,Age,Interests,Newsletter,Source,SignupDate,IPAddress\n';
    const csvContent = waitlist.map(entry => {
      return [
        entry.id,
        entry.email,
        entry.firstName,
        entry.age || '',
        entry.interests || '',
        entry.newsletter,
        entry.source,
        entry.signupDate,
        entry.ipAddress || ''
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvContent;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="hormoncode-waitlist-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      error: 'Failed to export waitlist',
      code: 'EXPORT_ERROR'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'HormonCode Waitlist API',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    code: 'UNHANDLED_ERROR'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    code: 'NOT_FOUND'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎯 HormonCode Waitlist API running on port ${PORT}`);
  console.log(`📊 Stats: http://localhost:${PORT}/api/waitlist/stats`);
  console.log(`📥 Export: http://localhost:${PORT}/api/waitlist/export?key=hormoncode_admin_2024`);
  console.log(`❤️ Health: http://localhost:${PORT}/health`);
});

module.exports = app;
