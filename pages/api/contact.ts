import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  success: boolean
  message: string
}

type Enquiry = {
  id: string
  name: string
  email: string
  phone: string
  shipmentType: string
  boxes: string
  weight: string
  details: string
  timestamp: string
  status: 'new' | 'contacted' | 'completed'
}

const ENQUIRIES_FILE = path.join(process.cwd(), 'data', 'enquiries.json')

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2))
  }
}

function saveEnquiry(enquiry: Enquiry): void {
  ensureDataDirectory()
  const enquiries: Enquiry[] = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'))
  enquiries.push(enquiry)
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2))
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, shipmentType, boxes, weight, details } = req.body

      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and phone are required fields.'
        })
      }

      const enquiry: Enquiry = {
        id: `ENQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone,
        shipmentType,
        boxes,
        weight,
        details,
        timestamp: new Date().toISOString(),
        status: 'new'
      }

      saveEnquiry(enquiry)

      console.log('✓ Form submission saved:', enquiry.id, '-', name, email)

      res.status(200).json({ 
        success: true, 
        message: 'Thank you for your enquiry! We will contact you shortly.' 
      })
    } catch (error) {
      console.error('Error saving enquiry:', error)
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your enquiry. Please try again.'
      })
    }
  } else {
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }
}
