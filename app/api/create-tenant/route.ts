// app/api/create-tenant/route.ts
import { NextRequest, NextResponse } from 'next/server'
import TenantModel  from '../../lib/model.tenant'

export async function POST(request: NextRequest) {
  try {
    const { name, subdomain } = await request.json()

    if (!name || !subdomain) {
      return NextResponse.json({ error: 'Name and subdomain are required' }, { status: 400 })
    }

    const existingTenant = await TenantModel.findOne({subdomain})

    if (existingTenant) {
      return NextResponse.json({ error: 'Subdomain already exists' }, { status: 409 })
    }

    const newTenant = await TenantModel.create({ name, subdomain })

    return NextResponse.json(newTenant, { status: 201 })
  } catch (error) {
    console.error('Error creating tenant:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}