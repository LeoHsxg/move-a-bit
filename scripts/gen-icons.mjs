import sharp from 'sharp'
import { readFileSync } from 'fs'
import { mkdir } from 'fs/promises'

const svg = readFileSync('./src/icon.svg')
await mkdir('./public/icons', { recursive: true })
await sharp(svg).resize(512, 512).png().toFile('./public/icons/icon-512.png')
await sharp(svg).resize(192, 192).png().toFile('./public/icons/icon-192.png')
console.log('✓ Icons written to public/icons/')
