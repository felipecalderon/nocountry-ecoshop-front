export interface MaterialComposition {
  id: string
  percentage: number
  materialComposition: Material
}

export interface CreateMaterialCompositionDto {
  name: string
  isEcoFriendly: boolean
  carbonFootprintPerKg: string
  waterUsagePerKg: string
}

export interface UpdateMaterialCompositionDto
  extends Partial<CreateMaterialCompositionDto> {}

export interface Material extends CreateMaterialCompositionDto {
  id: string
}
