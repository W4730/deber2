import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

// [title, handle, description, categories, usd, eur, images]
const NECKLACES: [string, string, string, string[], number, number, string[]][] = [
  ["Luna Crescent Necklace", "luna-crescent", "Layered gold chains with a crescent moon and a sky-blue stone. Made to be worn every day.", ["Necklaces", "Best Sellers"], 68, 62, ["1599643478518-a784e5dc4c8f", "1506630448388-4e683c67ddb0"]],
  ["Perla Classic Strand", "perla-classic", "A timeless strand of freshwater pearls with a gold clasp.", ["Necklaces", "Best Sellers"], 120, 110, ["1515562141207-7a88fb7ce338"]],
  ["Corazon Heart Pendant", "corazon-heart", "A delicate pave heart on a fine silver chain.", ["Necklaces", "New Arrivals"], 54, 49, ["1588444837495-c6cfeb53f32d"]],
  ["Aurora Pearl Drop", "aurora-pearl-drop", "A single pearl drop on an 18k gold-plated chain.", ["Necklaces", "New Arrivals"], 58, 53, ["1611085583191-a3b181a88401"]],
  ["Sol Everyday Chain", "sol-everyday-chain", "A fine gold chain that layers with everything.", ["Necklaces", "New Arrivals"], 39, 36, ["1600721391776-b5cd0e0048f9"]],
  ["Initial Charm Necklace", "initial-charm", "Pick your charm and make it yours. Engraving included.", ["Personalized Necklaces"], 45, 42, ["1506630448388-4e683c67ddb0"]],
  ["Nombre Name Necklace", "nombre-name", "Your name, a date or a word, hand-finished in Quito.", ["Personalized Necklaces", "Best Sellers"], 62, 57, ["1620656798579-1984d9e87df7"]],
  ["Dorada Layering Set", "dorada-layering-set", "Two delicate chains designed to be layered together.", ["Sets", "Best Sellers"], 89, 82, ["1611652022419-a9419f74343d", "1600721391776-b5cd0e0048f9"]],
  ["Andes Statement Set", "andes-statement-set", "A statement necklace and earrings set with ruby-tone stones.", ["Sets"], 150, 138, ["1601121141461-9d6647bca1ed"]],
];

const LENGTHS = ["40 cm", "45 cm"];

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  const americas = ["ec", "us", "co", "pe", "mx"];
  const europe = ["es", "fr", "de", "it", "gb"];
  const countries = [...americas, ...europe];

  logger.info("Seeding store data...");
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Default Sales Channel",
          description: "Created by Medusa",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Default Publishable API Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Lunara",
          supported_currencies: [
            { currency_code: "usd", is_default: true },
            { currency_code: "eur", is_default: false },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  });

  logger.info("Seeding region data...");
  await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Americas",
          currency_code: "usd",
          countries: americas,
          payment_providers: ["pp_system_default"],
        },
        {
          name: "Europe",
          currency_code: "eur",
          countries: europe,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });

  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  logger.info("Seeding stock location data...");
  const {
    result: [stockLocation],
  } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "Quito Atelier",
          address: {
            city: "Quito",
            country_code: "EC",
            address_1: "",
          },
        },
      ],
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  // This is created by a migration script in core.
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Lunara delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Americas & Europe",
        geo_zones: countries.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  const shippingOption = (
    name: string,
    code: string,
    description: string,
    usd: number,
    eur: number
  ) => ({
    name,
    price_type: "flat" as const,
    provider_id: "manual_manual",
    service_zone_id: fulfillmentSet.service_zones[0].id,
    shipping_profile_id: shippingProfile.id,
    type: { label: name, description, code },
    prices: [
      { currency_code: "usd", amount: usd },
      { currency_code: "eur", amount: eur },
    ],
    rules: [
      { attribute: "enabled_in_store", value: "true", operator: "eq" as const },
      { attribute: "is_return", value: "false", operator: "eq" as const },
    ],
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      shippingOption("Standard Shipping", "standard", "Ships in 3-5 days.", 5, 5),
      shippingOption("Express Shipping", "express", "Ships in 24 hours.", 15, 14),
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  });

  logger.info("Seeding product data...");
  const categoryNames = [...new Set(NECKLACES.flatMap(([, , , cats]) => cats))];
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: categoryNames.map((name) => ({
        name,
        is_active: true,
      })),
    },
  });

  const {
    result: [lengthOption],
  } = await createProductOptionsWorkflow(container).run({
    input: {
      product_options: [{ title: "Length", values: LENGTHS }],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: NECKLACES.map(
        ([title, handle, description, cats, usd, eur, images]) => ({
          title,
          handle,
          description,
          category_ids: categoryResult
            .filter((cat) => cats.includes(cat.name))
            .map((cat) => cat.id),
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          thumbnail: img(images[0]),
          images: images.map((id) => ({ url: img(id) })),
          options: [{ id: lengthOption.id }],
          variants: LENGTHS.map((length) => ({
            title: length,
            sku: `${handle}-${length.replace(" ", "")}`.toUpperCase(),
            options: { Length: length },
            prices: [
              { amount: usd, currency_code: "usd" },
              { amount: eur, currency_code: "eur" },
            ],
          })),
          sales_channels: [{ id: defaultSalesChannel.id }],
        })
      ),
    },
  });

  logger.info("Seeding inventory levels.");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 1000,
        inventory_item_id: item.id,
      })),
    },
  });

  logger.info("Finished seeding Lunara data.");
}
