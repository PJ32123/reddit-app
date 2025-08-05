export async function fetchFromReddit(path, normalize = false) {
  // Ensure the path starts with /reddit for Vite proxy
  if (!path.startsWith("/reddit")) {
    path = `/reddit${path}`;
  }

  // Ensure it ends with .json
  if (!path.endsWith(".json")) {
    path += ".json";
  }

  const res = await fetch(path, {
    headers: {
      "User-Agent": "my-reddit-client/0.1",
    },
  });

  if (!res.ok) {
    throw new Error(`Reddit API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (!json || (Array.isArray(json) && json.length === 0)) {
    throw new Error("No data returned from Reddit.");
  }

  // Optionally normalize posts
  // Normalization is a common term in data processing that refers in this case to the process of
  // taking raw data from an API and transforming it into a consistent, predictable shape
  // that your app can use without extra checks every time like checking if there is an image and
  // how it is stored.
  if (normalize && json.data?.children) {
    json.data.children = json.data.children.map((child) => {
      const post = child.data;
      // creates imageUrl property in post and checks for preview image, then overridden URL,
      // then thumbnail if it's a valid URL
      // and sets to post.imageUrl or sets null to post.imageUrl if none found
      post.imageUrl =
        // The ?s are optional chaining. If the property doesn't exist, it returns undefined
        // instead of throwing an error.
        post.preview?.images?.[0]?.source?.url?.replaceAll("&amp;", "&") ||
        post.url_overridden_by_dest ||
        (post.thumbnail && post.thumbnail.startsWith("http")
          ? post.thumbnail
          : null);
      return { data: post };
    });
  }

  return json;
}
