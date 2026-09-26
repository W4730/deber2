import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {(product.categories?.[0] || product.collection) && (
          <LocalizedClientLink
            href={
              product.categories?.[0]
                ? `/categories/${product.categories[0].handle}`
                : `/collections/${product.collection?.handle}`
            }
            className="text-xs tracking-[0.18em] uppercase text-lunara-gold"
          >
            {product.categories?.[0]?.name || product.collection?.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="font-serif text-4xl leading-tight text-lunara-ink"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-base text-lunara-muted whitespace-pre-line leading-7"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
