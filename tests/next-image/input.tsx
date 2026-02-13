import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image src="/image.jpg" width={500} height={300} alt="Description" />
      <Image
        src="/hero.jpg"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority
        alt="Hero"
      />
      <Image
        src="/image.jpg"
        width={500}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        alt="Description"
      />
      <Image
        src="https://res.cloudinary.com/demo/image.jpg"
        width={500}
        height={300}
        quality={80}
        alt="Description"
      />
      <Image
        src="/image.jpg"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        alt="Description"
      />
      <Image src={heroImg} alt="Hero" placeholder="blur" />
    </div>
  );
}
