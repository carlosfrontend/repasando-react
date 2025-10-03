import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image and updates on button click', async ({
    page,
}) => {
    await page.goto(LOCALHOST_URL)

    const text = page.locator('p')
    const image = page.locator('img')
    const button = page.locator('button')

    // Esperar a que el <p> tenga texto
    await expect(text).toHaveText(/\S+/)
    const factText = await text.textContent()
    console.log('Fact inicial:', factText)

    // Esperar a que la imagen tenga src asignado
    await expect(image).toHaveAttribute('src', /.+/)
    const imageUrl = await image.getAttribute('src')
    console.log('Imagen inicial:', imageUrl)
    expect(imageUrl?.startsWith(CAT_PREFIX_IMAGE_URL)).toBe(true)

    // Hacer click en el botón → refrescar fact
    await button.click()

    // Esperar a que la nueva imagen tenga src diferente al inicial
    await expect(image).not.toHaveAttribute('src', imageUrl)

    const newImageUrl = await image.getAttribute('src')
    console.log('Nueva imagen:', newImageUrl)
    expect(newImageUrl).not.toBe(imageUrl)

    // Opcional: verificar que el nuevo <p> tenga texto distinto
    await expect(text).toHaveText(/\S+/)
    const newFactText = await text.textContent()
    console.log('Nuevo fact:', newFactText)
    expect(newFactText).not.toBe(factText)
})
