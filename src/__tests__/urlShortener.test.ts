import { shortenUrl, getUrl } from "../services/urlShortener";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

jest.mock("../lib/firebase", () => ({
  db: jest.fn(),
}));

describe("URL Shortener Service", () => {
  it("should shorten a URL", async () => {
    const longUrl = "https://www.example.com";
    const shortId = await shortenUrl(longUrl);
    expect(shortId).toHaveLength(6);
  });

  it("should retrieve a URL", async () => {
    const shortId = "abc123";
    const longUrl = await getUrl(shortId);
    expect(longUrl).toBe("https://www.example.com");
  });
});
