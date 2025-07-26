import Head from "next/head";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import ItemList from "./components/Items/ItemList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Organizer</title>
        <meta name="description" content="Gdzie są Twoje rzeczy?" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-4 max-w-4xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the organizer!
          </h2>
          <p className="text-gray-700">
            Here you can add, search, and manage the location of items in your
            home.
          </p>
          <AddItemForm />
          <ItemList />
        </main>

        <Footer />
      </div>
    </>
  );
}
