'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Función para registrar un nuevo Club de forma dinámica
export async function createClub(formData) {
  try {
    const name = formData.get('name')
    const slug = formData.get('slug')

    const newClub = await prisma.club.create({
      data: {
        name,
        slug,
      },
    })

    return { success: true, club: newClub }
  } catch (error) {
    console.error('Error al crear el club:', error)
    return { success: false, error: error.message }
  }
}

// Función para registrar un Piloto y vincularlo a su Club automáticamente
export async function createRider(formData) {
  try {
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const nickname = formData.get('nickname')
    const email = formData.get('email')
    const bloodGroup = formData.get('bloodGroup')
    const clubId = formData.get('clubId') // Viene del select o ID del club seleccionado

    const newRider = await prisma.rider.create({
      data: {
        firstName,
        lastName,
        nickname,
        email,
        bloodGroup,
        clubId,
      },
    })

    return { success: true, rider: newRider }
  } catch (error) {
    console.error('Error al crear el piloto:', error)
    return { success: false, error: error.message }
  }
}