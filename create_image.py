#!/usr/bin/env python3
import struct

def create_jpeg_header(width, height):
    """Erstelle einen minimalen JPEG-Header"""
    # JPEG Start of Image
    soi = b'\xff\xd8'
    
    # JPEG End of Image  
    eoi = b'\xff\xd9'
    
    # Einfacher JPEG-Header für Graustufen
    header = (
        # JFIF Marker
        b'\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00H\x00H\x00\x00'
        # Quantization Table
        b'\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9=82<.342'
        # Start of Frame
        b'\xff\xc0\x00\x11\x08' + struct.pack('>HH', height, width) + b'\x01\x11\x00\x02\x11\x01\x03\x11\x01'
        # Huffman Table
        b'\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b'
        # Start of Scan
        b'\xff\xda\x00\x0c\x03\x01\x00\x02\x11\x03\x11\x00\x3f\x00'
    )
    
    return soi + header

def create_simple_image_data(width, height):
    """Erstelle einfache Bilddaten (Muster)"""
    data = bytearray()
    for y in range(height):
        for x in range(width):
            # Einfaches Muster: Frau mit Kamera
            if 350 <= x <= 450 and 200 <= y <= 300:  # Kopf
                data.append(244)  # Hautfarbe
            elif 390 <= x <= 410 and 400 <= y <= 450:  # Kamera
                data.append(44)   # Schwarz
            elif 370 <= x <= 385 and 230 <= y <= 245:  # Auge links
                data.append(74)   # Blau
            elif 415 <= x <= 430 and 230 <= y <= 245:  # Auge rechts
                data.append(74)   # Blau
            else:
                data.append(144)  # Hintergrund
    return bytes(data)

# Erstelle das Bild
width, height = 800, 1200
jpeg_data = create_jpeg_header(width, height) + create_simple_image_data(width, height) + b'\xff\xd9'

with open('/Users/tabeawidmer/Desktop/hormoncode-website/woman-with-camera-real.jpg', 'wb') as f:
    f.write(jpeg_data)

print(f'Bild erstellt: woman-with-camera-real.jpg ({len(jpeg_data)} bytes)')
