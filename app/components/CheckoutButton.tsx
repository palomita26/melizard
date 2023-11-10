"use client";

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({}),
      });
      console.log({ response });
      const data = await response.json();
      console.log({ data });
      window.location.href = data.url;
    } catch (e) {}
  };
  return (
    <button
      onClick={handleCheckout}
      className="p-2 rounded-md bg-gray-600 hover:bg-gray-500"
    >
      Buy treat for lizard
    </button>
  );
}
