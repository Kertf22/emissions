import { Button } from "../components/button"
import { Card } from "../components/card"
import useGlobalStore from "../infra/store";
import { getCountryInfo } from "../infra/actions/getCountryInfo";


const Question_6 = () => {

    const { loading, setData, setLoading } = useGlobalStore();

    const handleQ6 = async () => {
        setLoading(true);

        try {
            const data = await getCountryInfo("global");

            if (data.length === 0) throw Error("Error")
            setData({
                type: "6",
                value: data[0]
            });
        } catch (err) {
            setData({
                type: 'error',
                value: null
            })
        }
        setLoading(false);

    }


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
    )
}

export default Question_6;