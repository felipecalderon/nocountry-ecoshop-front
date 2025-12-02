export interface CreateMaterialCompositionDto {
  name: string
  isEcoFriendly: boolean
  carbonFootprintPerKg: number
  waterUsagePerKg: number
}

export interface UpdateMaterialCompositionDto
  extends Partial<CreateMaterialCompositionDto> {}
