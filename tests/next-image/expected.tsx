import { Image } from "@unpic/react";

export default function Page() {
  return (
    <div>
      <Image src="/image.jpg" width={500} height={300} alt="Description" layout="constrained" />
      <Image src="/hero.jpg" sizes="100vw" style={{ objectFit: "cover" }} priority alt="Hero" layout="fullWidth" />
      <Image src="/image.jpg" width={500} height={300} alt="Description" layout="constrained" background=data:image/jpeg;base64,..." />
      <Image src="https://res.cloudinary.com/demo/image.jpg" width={500} height={300} alt="Description" layout="constrained" />
      <Image src="/image.jpg" sizes="(max-width: 768px) 100vw, 50vw" alt="Description" layout="fullWidth" />
      <Image src={heroImg} alt="Hero" background="auto" />
    </div>
  );
}
