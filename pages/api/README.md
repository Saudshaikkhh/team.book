# API Routes

## Contact Form Endpoint

The `/api/contact` endpoint handles form submissions from the landing page.

### Current Implementation

Currently, the endpoint:
- Accepts POST requests with form data
- Logs submissions to the server console
- Returns a success response to the user

### Production Integration

To make this production-ready, you should integrate with one of the following:

#### Option 1: Email Service
Integrate with an email service like:
- SendGrid
- Mailgun
- AWS SES
- Postmark

Example with SendGrid:
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'your-email@cargoforce.com',
  from: 'noreply@cargoforce.com',
  subject: 'New Enquiry from Website',
  text: `Name: ${name}\nEmail: ${email}\n...`,
};

await sgMail.send(msg);
```

#### Option 2: Database Storage
Save enquiries to your database:
```typescript
import { db } from '@/lib/db';

await db.enquiries.create({
  data: { name, email, phone, shipmentType, boxes, weight, details }
});
```

#### Option 3: CRM Integration
Send directly to your CRM (HubSpot, Salesforce, etc.)

### Environment Variables

Add the required API keys to your environment:
- `SENDGRID_API_KEY` (for email)
- `DATABASE_URL` (for database)
- Or other service-specific credentials
