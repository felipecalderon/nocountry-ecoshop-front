"use server"

import { CreateMaterialCompositionDto } from "@/types"

const LLM_URL = "https://api.openai.com/v1/"
const LLM_API_KEY = process.env.OPENAI_API_KEY
export const generateMaterialComposition = async (
  prompt: string
): Promise<CreateMaterialCompositionDto> => {
  const response = await fetch(`${LLM_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un excelente ambientalista conocedor de diversos materiales productivos.
            Todas las métricas se calculan estrictamente por 1 kg del material solicitado.
            No se permite extrapolación a otros pesos.
            La función complete_material_profile debe ser llamada siempre que un mensaje de usuario describa o nombre un material.`,
        },
        {
          role: "user",
          content: `¿Cual es el perfil ambiental y técnico de: ${prompt}?`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "complete_material_profile",
            description:
              "Genera un perfil ambiental para un material, considerando su huella de carbono en la etapa de producción y evaluando el material por kilogramo",
            parameters: {
              type: "object",
              properties: {
                material: {
                  type: "string",
                  description: "Nombre del material",
                },
                isEcoFriendly: {
                  type: "boolean",
                  description: "Indica si el material es ecológico",
                },
                carbonFootprintPerKg: {
                  type: "number",
                  description: "Consumo de CO2 en gramos por kilogramo",
                },
                waterUsagePerKg: {
                  type: "number",
                  description: "Consumo de agua en litros por kilogramo",
                },
              },
              required: [
                "material",
                "isEcoFriendly",
                "carbonFootprintPerKg",
                "waterUsagePerKg",
              ],
            },
          },
        },
      ],
      tool_choice: "auto",
    }),
  })
  const data = await response.json()
  const toolResponse = data.choices[0].message.tool_calls[0].function.arguments
  if (!toolResponse) {
    throw new Error("No se pudo obtener la respuesta del LLM")
  }
  return JSON.parse(toolResponse)
}
