import { useState, useEffect } from "react";
import ListingCard from "@components/ListingCard";
import useSupabase from "@utils/useSupabase";

const LandingPage = () => {
  const { getBoats } = useSupabase();
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBoats();
      if (result.error) setError(result.error);
      if (result.data && !result.error) setBoats(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-w-screen-xl container mx-auto min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {boats.map((boat) => (
          <div key={boat.id} className="flex justify-center">
            <ListingCard boat={boat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
