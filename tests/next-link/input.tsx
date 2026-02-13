import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="/about">About</Link>
      <Link href={`/blog/post/${postId}`}>Blog Post</Link>
      <Link
        href={{
          pathname: "/search",
          query: { q: "tanstack", page: 1 },
        }}
      >
        Search
      </Link>{" "}
      <button
        onClick={() => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, page: 2 },
          });
        }}
      >
        Next Page
      </button>
      <Link href="/dashboard#settings">Settings</Link>
      <Link href="/about" replace>
        About
      </Link>
      <Link href="/dashboard" scroll={false}>
        Dashboard
      </Link>
      <Link href="/posts" prefetch={true}>
        Posts
      </Link>
      <Link href="/about" prefetch={false}>
        About
      </Link>
      <Link href="https://example.com" target="_blank">
        External
      </Link>
      <Link href="/disabled" onClick={(e) => condition && e.preventDefault()}>
        Disabled
      </Link>
      <Link
        href={`/${item.slug}`}
        key={item.name}
        className="group flex flex-col gap-1 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        <div className="flex items-center justify-between font-medium text-gray-200 group-hover:text-gray-50">
          {item.name} <LinkStatus />
        </div>
        {item.description ? (
          <div className="line-clamp-3 text-[13px] text-gray-500 group-hover:text-gray-300">
            {item.description}
          </div>
        ) : null}
      </Link>
      <Link
        href={`/patterns/${item.slug}`}
        key={item.name}
        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
      >
        <div className="font-medium text-gray-200 group-hover:text-gray-50">
          {item.name}
        </div>
        {item.description ? (
          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
            {item.description}
          </div>
        ) : null}
      </Link>
      <Link href="/active-links/profile">
        <Image
          src="/prince-akachi-LWkFHEGpleE-unsplash.jpg"
          className="rounded-full"
          width={40}
          height={40}
          alt="User"
        />
      </Link>
      <Link
        href="/private-cache"
        className="flex items-center gap-2 font-medium text-gray-300 hover:text-white"
      >
        <ChevronLeftIcon className="size-6 text-gray-600" />
        <div>Shop</div>
      </Link>
    </div>
  );
}
