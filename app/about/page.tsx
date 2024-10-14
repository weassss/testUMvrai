import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg mb-6">
            We are a leading company in innovative solutions, dedicated to providing high-quality products and services to our customers. With years of experience and a passionate team, we strive to exceed expectations and deliver excellence in everything we do.
          </p>
          <p className="text-lg mb-6">
            Our mission is to empower businesses and individuals with cutting-edge technology and unparalleled support. We believe in fostering long-term relationships with our clients and continuously improving our offerings to meet the evolving needs of the market.
          </p>
        </div>
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="About Us Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}