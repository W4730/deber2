const benefits = [
  {
    title: "Shipping across Ecuador",
    text: "Careful delivery to your door, wrapped as a gift.",
  },
  {
    title: "Secure payments",
    text: "Encrypted checkout with trusted payment methods.",
  },
  {
    title: "High-quality materials",
    text: "Gold-filled, pearls, and hypoallergenic finishes.",
  },
  {
    title: "Personal service",
    text: "A boutique team ready to help you choose a piece.",
  },
]

const TrustSection = () => {
  return (
    <section className="bg-lunara-blush/70 py-16 small:py-20">
      <div className="content-container">
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.24em] uppercase text-lunara-gold">
            Why shop with us
          </p>
          <h2 className="mt-2 font-serif text-4xl">Thoughtful from first glance</h2>
        </div>
        <div className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-4 gap-8">
          {benefits.map((item) => (
            <div key={item.title} className="text-center px-4">
              <div className="mx-auto mb-4 h-px w-10 bg-lunara-gold" />
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-lunara-muted leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
