import { Button } from "../components/button";
import { Card } from "../components/card";
import useGlobalStore from "../infra/store";
import { getCountryInfo } from "../infra/actions/getCountryInfo";
import { useQuery } from "react-query";

const Question_6 = () => {
  const { loading, setData, setLoading } = useGlobalStore();

  const { refetch } = useQuery({
    queryKey: "questions6",
    onSettled: () => setLoading(false),
    queryFn: async () => {
      setLoading(true);
      return await getCountryInfo("global");
    },
    cacheTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    onSuccess: (data) => {
      if (data.length === 0) {
        setData({
          value: null,
          type: "error",
        });
      } else {
        setData({
          type: "6",
          value: data[0],
        });
      }
    },
    onError: () => {
      setData({
        value: null,
        type: "error",
      });
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleQ6 = async () => {
    refetch();
  };

  return (
    <Card>
      <div className="w-full flex flex-col justify-center gap-4">
        <p className="text-md font-semibold text-gray-700 text-center">
          Fonte responsável pela maior emissão de CO2 mundial
        </p>
      </div>
      <Button disabled={loading} onClick={handleQ6}>
        Buscar
      </Button>
    </Card>
  );
};

export default Question_6;
