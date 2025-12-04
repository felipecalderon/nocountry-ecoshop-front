export const ENDPOINTS_BACKEND = {
  openapi: "3.0.0",
  paths: {
    "/users/profile": {
      get: {
        operationId: "UsersController_getProfile",
        parameters: [],
        responses: {
          "200": {
            description: "Retorna los datos del usuario logueado.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener perfil del usuario autenticado",
        tags: ["Usuarios"],
      },
      patch: {
        operationId: "UsersController_updateProfile",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUserDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Perfil actualizado correctamente.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Actualizar perfil del usuario autenticado",
        tags: ["Usuarios"],
      },
    },
    "/users/profile/image": {
      post: {
        description:
          "Sube una imagen (jpg, png, webp), la guarda en Cloudinary y actualiza el perfil del usuario.",
        operationId: "UsersController_uploadProfileImage",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Imagen actualizada exitosamente.",
            content: {
              "application/json": {
                schema: {
                  example: {
                    id: "uuid-user",
                    email: "user@test.com",
                    profileImage: "https://res.cloudinary.com/...",
                  },
                },
              },
            },
          },
          "400": {
            description: "Archivo inválido (formato o tamaño > 2MB).",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Actualizar foto de perfil",
        tags: ["Usuarios"],
      },
    },
    "/users/dashboard/impact": {
      get: {
        operationId: "UsersController_getImpactStats",
        parameters: [],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ImpactStatsDto",
                },
              },
            },
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener métricas de impacto ambiental del usuario",
        tags: ["Usuarios"],
      },
    },
    "/orders": {
      post: {
        operationId: "OrdersController_create",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateOrderDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear una nueva orden de compra",
        tags: ["Órdenes de Compra"],
      },
      get: {
        operationId: "OrdersController_findAll",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Historial de compras del usuario",
        tags: ["Órdenes de Compra"],
      },
    },
    "/products": {
      get: {
        operationId: "ProductsController_findAll",
        parameters: [],
        responses: {
          "200": {
            description: "Lista de productos recuperada exitosamente.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
          "500": {
            description: "Error interno del servidor.",
          },
        },
        summary:
          "Obtiene una lista de todos los productos, incluyendo sus relaciones ambientales y de marca.",
        tags: ["products"],
      },
      post: {
        operationId: "ProductsController_create",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateProductDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Producto creado exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          "400": {
            description:
              "Fallo de validación de datos o ID de certificación no válido, o la suma de porcentajes de materiales no es 100.",
          },
          "404": {
            description: "No se encontró la Marca o Composición de Material.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crea un nuevo producto con su impacto ambiental y materiales",
        tags: ["products"],
      },
    },
    "/products/{term}": {
      get: {
        description:
          "El parámetro `:term` puede ser cualquiera de los tres identificadores.",
        operationId: "ProductsController_findOne",
        parameters: [
          {
            name: "term",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Detalles del producto recuperados exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          "404": {
            description: "Producto no encontrado.",
          },
        },
        summary:
          "Obtiene los detalles de un producto por su ID (UUID), slug o SKU",
        tags: ["products"],
      },
    },
    "/products/{id}": {
      patch: {
        operationId: "ProductsController_update",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProductDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Producto actualizado exitosamente",
          },
          "400": {
            description: "ID de producto inválido o duplicado de slug/sku",
          },
          "403": {
            description:
              "No tienes permisos para actualizar este producto (no es de tu marca)",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Actualizar un producto por ID",
        tags: ["products"],
      },
      delete: {
        operationId: "ProductsController_delete",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description:
              "Borrado lógico exitoso. El producto ya no será visible en las búsquedas estándar.",
          },
          "404": {
            description: "Producto no encontrado.",
          },
        },
        summary: "Realiza un borrado lógico de un producto por su ID (UUID).",
        tags: ["products"],
      },
    },
    "/brands": {
      post: {
        operationId: "BrandsController_create",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/CreateBrandDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Registrar una nueva marca (con logo opcional)",
        tags: ["Marcas (Gestión)"],
      },
      get: {
        operationId: "BrandsController_findMyBrand",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Ver datos de la marca del usuario",
        tags: ["Marcas (Gestión)"],
      },
    },
    "/brands/orders": {
      get: {
        operationId: "BrandsController_getMyOrders",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Ver órdenes que contienen mis productos",
        tags: ["Marcas (Gestión)"],
      },
    },
    "/brands/orders/{id}/status": {
      patch: {
        operationId: "BrandsController_updateOrderStatus",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateOrderStatusDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Actualizar estado de envío (ej: SHIPPED)",
        tags: ["Marcas (Gestión)"],
      },
    },
    "/brands/dashboard/stats": {
      get: {
        description:
          "Devuelve el total de ingresos, unidades vendidas y órdenes recibidas. Calcula solo sobre órdenes PAGADAS.",
        operationId: "BrandsController_getBrandStats",
        parameters: [],
        responses: {
          "200": {
            description: "Métricas calculadas exitosamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BrandStatsDto",
                },
              },
            },
          },
          "400": {
            description: "El usuario no tiene una marca asociada.",
          },
          "403": {
            description: "Acceso denegado (Requiere rol BRAND_ADMIN o ADMIN).",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener métricas de negocio de la marca",
        tags: ["Marcas (Gestión)"],
      },
    },
    "/material-composition/material-compositions": {
      post: {
        operationId: "MaterialCompositionController_createMaterialComposition",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateMaterialCompositionDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear nuevo material base",
        tags: ["MaterialComposition"],
      },
      get: {
        operationId: "MaterialCompositionController_findAll",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        summary: "Listar todos los materiales",
        tags: ["MaterialComposition"],
      },
    },
    "/material-composition/material-compositions/{id}": {
      get: {
        operationId: "MaterialCompositionController_findOne",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "",
          },
        },
        summary: "Obtener un material por ID",
        tags: ["MaterialComposition"],
      },
      patch: {
        operationId: "MaterialCompositionController_update",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateMaterialCompositionDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Actualizar material",
        tags: ["MaterialComposition"],
      },
      delete: {
        operationId: "MaterialCompositionController_remove",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Eliminar material",
        tags: ["MaterialComposition"],
      },
    },
    "/certifications": {
      post: {
        operationId: "CertificationsController_create",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  file: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear nueva certificación (Solo Admin)",
        tags: ["Certificaciones"],
      },
      get: {
        operationId: "CertificationsController_findAll",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        summary: "Listar todas las certificaciones disponibles",
        tags: ["Certificaciones"],
      },
    },
    "/auth/login": {
      post: {
        description:
          "Recibe un JWT válido de Auth0, verifica si el usuario existe en BD local. Si no, lo crea. Retorna el usuario de la BD.",
        operationId: "AuthController_login",
        parameters: [],
        responses: {
          "200": {
            description: "Usuario validado/creado exitosamente.",
          },
          "401": {
            description: "Token de Auth0 inválido o expirado.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Sincronizar usuario desde Auth0",
        tags: ["Autenticación"],
      },
    },
    "/addresses": {
      post: {
        operationId: "AddressesController_create",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateAddressDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Dirección creada exitosamente.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear una nueva dirección",
        tags: ["Direcciones"],
      },
      get: {
        operationId: "AddressesController_findAll",
        parameters: [],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Listar mis direcciones",
        tags: ["Direcciones"],
      },
    },
    "/addresses/{id}": {
      get: {
        operationId: "AddressesController_findOne",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener una dirección por ID",
        tags: ["Direcciones"],
      },
      delete: {
        operationId: "AddressesController_remove",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Eliminar una dirección",
        tags: ["Direcciones"],
      },
    },
    "/payments/create-checkout-session": {
      post: {
        operationId: "PaymentsController_createCheckoutSession",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                example: {
                  orderId: "uuid-de-la-orden",
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear sesión de pago en Stripe",
        tags: ["Pagos"],
      },
    },
    "/payments/webhook": {
      post: {
        operationId: "PaymentsController_handleWebhook",
        parameters: [
          {
            name: "stripe-signature",
            required: true,
            in: "header",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "201": {
            description: "",
          },
        },
        summary: "Webhook de Stripe",
        tags: ["Pagos"],
      },
    },
    "/admin/dashboard/stats": {
      get: {
        description:
          "Devuelve el resumen financiero y ecológico total de EcoShop.",
        operationId: "AdminController_getDashboardStats",
        parameters: [],
        responses: {
          "200": {
            description: "Estadísticas calculadas correctamente.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AdminStatsDto",
                },
              },
            },
          },
          "403": {
            description: "Forbidden. Requiere rol ADMIN.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Métricas globales de la plataforma",
        tags: ["Admin Dashboard"],
      },
    },
    "/admin/users/{id}/ban": {
      patch: {
        description:
          "Bloquea el acceso de un usuario a la plataforma. El usuario no podrá loguearse ni comprar.",
        operationId: "AdminController_toggleUserBan",
        parameters: [
          {
            name: "id",
            required: true,
            in: "path",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BanUserDto",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Estado del usuario actualizado (isBanned).",
          },
          "404": {
            description: "Usuario no encontrado.",
          },
          "409": {
            description: "Conflicto (ej: intentar banearse a uno mismo).",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Banear o Desbanear usuario",
        tags: ["Admin Dashboard"],
      },
    },
    "/admin/users": {
      get: {
        description:
          "Devuelve la lista de usuarios registrados con sus datos básicos. Usa ?page=1&limit=10.",
        operationId: "AdminController_findAllUsers",
        parameters: [
          {
            name: "page",
            required: false,
            in: "query",
            description: "Número de página actual",
            schema: {
              default: 1,
              type: "number",
            },
          },
          {
            name: "limit",
            required: false,
            in: "query",
            description: "Cantidad de items por página",
            schema: {
              default: 10,
              type: "number",
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista retornada correctamente con metadatos.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Listar todos los usuarios (Paginado)",
        tags: ["Admin Dashboard"],
      },
    },
    "/wallet/balance": {
      get: {
        operationId: "WalletController_getBlance",
        parameters: [],
        responses: {
          "200": {
            description:
              "Retorna el objeto wallet con el saldo y nivel actual.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener saldo actual, nivel y estado de la billetera",
        tags: ["Eco-Wallet"],
      },
    },
    "/wallet/history": {
      get: {
        operationId: "WalletController_getHistory",
        parameters: [],
        responses: {
          "200": {
            description:
              "Lista de las últimas transacciones ordenadas por fecha.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Ver historial de transacciones (Ganancias y Canjes)",
        tags: ["Eco-Wallet"],
      },
    },
    "/wallet/redeem": {
      post: {
        operationId: "WalletController_redeemPoints",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RedeemPointsDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description:
              "Canje exitoso. Retorna el nuevo saldo y ID de transacción.",
          },
          "400": {
            description: "Error de validación o recompensa inactiva.",
          },
          "422": {
            description:
              "Error de negocio: Saldo insuficiente o Stock agotado.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Canjear puntos por una recompensa",
        tags: ["Eco-Wallet"],
      },
    },
    "/wallet/rewards": {
      get: {
        operationId: "WalletController_getRewards",
        parameters: [],
        responses: {
          "200": {
            description: "Lista de recompensas disponibles para canje.",
          },
        },
        summary: "Listar catálogo de recompensas activas",
        tags: ["Eco-Wallet"],
      },
      post: {
        operationId: "WalletController_createReward",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateRewardDto",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Recompensa creada correctamente en el catálogo.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Crear nueva recompensa (Solo Admin)",
        tags: ["Eco-Wallet"],
      },
    },
    "/wallet/coupons": {
      get: {
        operationId: "WalletController_getMyCoupons",
        parameters: [
          {
            name: "onlyActive",
            required: false,
            in: "query",
            description:
              "Filtro de estado. Si es true (por defecto), devuelve SOLO cupones válidos (no usados y no vencidos), ideal para mostrar en el Checkout. Si es false, devuelve todo el historial histórico de cupones (usados y vencidos).",
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de cupones pertenecientes al usuario.",
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        summary: "Obtener mis cupones generados",
        tags: ["Eco-Wallet"],
      },
    },
  },
  info: {
    title: "EcoShop E-commerce",
    description:
      "API de EcoShop para la gestion de productos sostenibles y ecologicos",
    version: "1.0",
    contact: {},
  },
  tags: [],
  servers: [],
  components: {
    securitySchemes: {
      bearer: {
        scheme: "bearer",
        bearerFormat: "JWT",
        type: "http",
      },
    },
    schemas: {
      UpdateUserDto: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            description: "Nombre de pila",
            example: "Facundo",
          },
          lastName: {
            type: "string",
            description: "Apellido",
            example: "Ortiz",
          },
          nationalId: {
            type: "string",
            description: "DNI o Identificación fiscal",
            example: "12345678",
          },
          phone: {
            type: "string",
            description: "Teléfono de contacto",
            example: "+5491122334455",
          },
          birthDate: {
            format: "date-time",
            type: "string",
            description: "Fecha de nacimiento (ISO 8601)",
            example: "1990-05-15",
          },
        },
      },
      ImpactStatsDto: {
        type: "object",
        properties: {
          totalOrders: {
            type: "number",
            description: "Total de órdenes pagadas",
            example: 12,
          },
          co2SavedKg: {
            type: "number",
            description: "Kg de CO2 evitados/compensados",
            example: 45.5,
          },
          treesEquivalent: {
            type: "number",
            description: "Equivalencia en árboles plantados",
            example: 2,
          },
          ecoLevel: {
            type: "string",
            description: "Nivel de sostenibilidad del usuario",
            example: "🌱 Brote Consciente",
          },
          nextLevelGoal: {
            type: "number",
            description: "Siguiente meta para subir de nivel",
            example: 50,
          },
        },
        required: [
          "totalOrders",
          "co2SavedKg",
          "treesEquivalent",
          "ecoLevel",
          "nextLevelGoal",
        ],
      },
      OrderItemDto: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            description: "ID del producto",
            example: "uuid-product",
          },
          quantity: {
            type: "number",
            description: "Cantidad a comprar",
            example: 2,
          },
        },
        required: ["productId", "quantity"],
      },
      CreateOrderDto: {
        type: "object",
        properties: {
          addressId: {
            type: "string",
            description: "ID de la dirección de envío",
            example: "uuid-address",
          },
          items: {
            description: "Lista de productos",
            type: "array",
            items: {
              $ref: "#/components/schemas/OrderItemDto",
            },
          },
          couponCode: {
            type: "string",
            description: "Código de cupón",
            example: "ECO-A1B2C3",
          },
        },
        required: ["addressId", "items"],
      },
      Product: {
        type: "object",
        properties: {},
      },
      EnvironmentalImpactDto: {
        type: "object",
        properties: {
          recycledContent: {
            type: "number",
            description: "Porcentaje de contenido recicldo",
            example: 75.5,
            minimum: 0,
            maximum: 100,
          },
          materials: {
            description:
              "Composicion de materiales del producto (IDs existentes)",
            items: {
              type: "array",
            },
            type: "array",
          },
        },
        required: ["recycledContent", "materials"],
      },
      CreateProductDto: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del producto",
            example: "Camisa de Algodón Orgánico Blanca",
            minLength: 3,
            maxLength: 200,
          },
          image: {
            type: "string",
            description: "URL de la imagen principal del producto",
            example: "https://example.com/images/camisa-blanca.jpg",
          },
          description: {
            type: "string",
            description: "Descripcion detallada del producto",
            example:
              "Camisa fabricada con algodón 100% orgánico certificado GOTS, etc...",
            maxLength: 5000,
          },
          price: {
            type: "number",
            description: "Precio del producto en dolares",
            example: 29.99,
            minimum: 0.01,
          },
          stock: {
            type: "number",
            description: "Cantidad disponible en stock",
            example: 150,
            minimum: 0,
          },
          originCountry: {
            type: "string",
            description: "Pais de origen del producto",
            example: "Argentina",
            maxLength: 100,
          },
          weightKg: {
            type: "number",
            description: "Peso del producto en kilogramos",
            example: 3.2,
            minimum: 0,
          },
          recyclabilityStatus: {
            type: "string",
            description: "Estado de reciclabildad del producto",
            enum: [
              "FULLY_RECYCLABLE",
              "PARTIALLY_RECYCLABLE",
              "NON_RECYCLABLE",
            ],
            example: "FULLY_RECYCLABLE",
          },
          imageAltText: {
            type: "string",
            description: "Texto alternativo para la imagen (accesibilidad)",
            example: "Camisa blanca de algodoón orgánico sobre fondo negro",
            maxLength: 255,
          },
          environmentalImpact: {
            description: "Impacto ambiental del producto",
            allOf: [
              {
                $ref: "#/components/schemas/EnvironmentalImpactDto",
              },
            ],
          },
          materials: {
            description: "Composicion de materiales del producto",
            items: {
              type: "array",
            },
            type: "array",
          },
          certificationIds: {
            description: "IDs de las certificados del producto",
            example: [
              "123e4567-e89b-12d3-a456-426614174000",
              "223a456b-78c9-0d1e-2f34-56789ghijk02",
            ],
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "name",
          "image",
          "price",
          "stock",
          "weightKg",
          "recyclabilityStatus",
          "environmentalImpact",
          "materials",
        ],
      },
      UpdateProductDto: {
        type: "object",
        properties: {},
      },
      CreateBrandDto: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre de la marca (unico)",
            example: "Patagonia",
            minLength: 2,
            maxLength: 100,
          },
          description: {
            type: "string",
            description: "Descripcion de la marca",
            example:
              "Marca lider en ropa outdoor sostenible y comprometida con el medio ambiente",
            maxLength: 2000,
          },
          logoUrl: {
            type: "string",
          },
        },
        required: ["name"],
      },
      UpdateOrderStatusDto: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "Nuevo estado de la orden",
            enum: ["pending", "paid", "shipped", "completed", "cancelled"],
            example: "shipped",
          },
        },
        required: ["status"],
      },
      BrandStatsDto: {
        type: "object",
        properties: {
          totalRevenue: {
            type: "number",
            description:
              "Ingresos totales generados por los productos de la marca (Suma de precios al momento de compra)",
            example: 15400.5,
          },
          totalUnitsSold: {
            type: "number",
            description: "Cantidad total de unidades de productos vendidas",
            example: 340,
          },
          totalOrders: {
            type: "number",
            description:
              "Cantidad de órdenes únicas que contienen al menos un producto de la marca",
            example: 45,
          },
        },
        required: ["totalRevenue", "totalUnitsSold", "totalOrders"],
      },
      CreateMaterialCompositionDto: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del material (Debe ser único)",
            example: "Algodón Orgánico",
            minLength: 2,
            maxLength: 100,
          },
          isEcoFriendly: {
            type: "boolean",
            description: "Indica si el material es considerado ecológico",
            example: true,
            default: false,
          },
          carbonFootprintPerKg: {
            type: "number",
            description: "Huella de carbono por Kg de material (kg CO2e)",
            example: 3.5,
            minimum: 0,
          },
          waterUsagePerKg: {
            type: "number",
            description: "Uso de agua por Kg de material (litros)",
            example: 2500.5,
            minimum: 0,
          },
        },
        required: [
          "name",
          "isEcoFriendly",
          "carbonFootprintPerKg",
          "waterUsagePerKg",
        ],
      },
      UpdateMaterialCompositionDto: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del material (Debe ser único)",
            example: "Algodón Orgánico",
            minLength: 2,
            maxLength: 100,
          },
          isEcoFriendly: {
            type: "boolean",
            description: "Indica si el material es considerado ecológico",
            example: true,
            default: false,
          },
          carbonFootprintPerKg: {
            type: "number",
            description: "Huella de carbono por Kg de material (kg CO2e)",
            example: 3.5,
            minimum: 0,
          },
          waterUsagePerKg: {
            type: "number",
            description: "Uso de agua por Kg de material (litros)",
            example: 2500.5,
            minimum: 0,
          },
        },
      },
      CreateAddressDto: {
        type: "object",
        properties: {
          street: {
            type: "string",
            description: "Calle y número",
            example: "Av. Corrientes 1234",
          },
          city: {
            type: "string",
            description: "Ciudad",
            example: "Buenos Aires",
          },
          postalCode: {
            type: "string",
            description: "Código Postal",
            example: "C1043",
          },
          country: {
            type: "string",
            description: "País",
            example: "Argentina",
          },
          addressType: {
            type: "string",
            enum: ["shipping", "billing"],
            default: "shipping",
          },
        },
        required: ["street", "country"],
      },
      AdminStatsDto: {
        type: "object",
        properties: {
          totalRevenue: {
            type: "number",
            description: "Ingresos totales históricos de la plataforma",
            example: 150000.5,
          },
          totalOrders: {
            type: "number",
            description: "Cantidad total de órdenes procesadas y pagadas",
            example: 120,
          },
          totalCo2Saved: {
            type: "number",
            description: "Total de CO2 compensado por la comunidad (kg)",
            example: 500.25,
          },
          totalUsers: {
            type: "number",
            description: "Cantidad de usuarios registrados",
            example: 350,
          },
        },
        required: [
          "totalRevenue",
          "totalOrders",
          "totalCo2Saved",
          "totalUsers",
        ],
      },
      BanUserDto: {
        type: "object",
        properties: {
          isBanned: {
            type: "boolean",
            description:
              "Estado de bloqueo del usuario. True para banear, False para activar.",
            example: true,
          },
        },
        required: ["isBanned"],
      },
      RedeemPointsDto: {
        type: "object",
        properties: {
          rewardId: {
            type: "string",
            description: "ID único de la recompensa o causa benéfica a canjear",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
          amount: {
            type: "number",
            description: "Cantidad de puntos a utilizar en el canje",
            minimum: 1,
            example: 100,
          },
        },
        required: ["rewardId", "amount"],
      },
      CreateRewardDto: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre de la recompensa",
            example: "PlantaEco-Descuento 10%",
          },
          description: {
            type: "string",
            description: "Descripción detallada",
            example:
              "Obtén un 10% de descuento en tu próxima compra sostenible.",
          },
          costInPoints: {
            type: "number",
            description: "Costo en puntos",
            minimum: 1,
            example: 500,
          },
          imageUrl: {
            type: "string",
            description: "URL de la imagen ilustrativa",
          },
          stock: {
            type: "number",
            description: "Stock inicial (dejar vacío para ilimitado)",
            example: 100,
          },
          type: {
            type: "string",
            description: "Tipo de recompensa",
            enum: ["DONATION", "COUPON", "PRODUCT"],
            default: "DONATION",
          },
          isActive: {
            type: "boolean",
            description: "Si la recompensa está activa inmediatamente",
            default: true,
          },
          metadata: {
            type: "object",
            description:
              "Configuración extra (ej: porcentaje de descuento, días validez)",
            example: {
              discountPercentage: 10,
              validDays: 30,
            },
          },
        },
        required: ["name", "costInPoints", "type"],
      },
    },
  },
}
