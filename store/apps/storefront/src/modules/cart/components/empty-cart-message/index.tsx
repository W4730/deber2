import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-32 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="font-serif text-4xl"
      >
        Your bag is empty
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem] text-lunara-muted">
        Discover a necklace that feels like you, then come back to complete your order.
      </Text>
      <div>
        <InteractiveLink href="/store">Continue Shopping</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
