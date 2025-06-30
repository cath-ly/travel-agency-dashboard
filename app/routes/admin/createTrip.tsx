import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/createTrip";
import { Header } from "components";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey } from "~/lib/utils";

export const loader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flag,name,latlng,value,maps"
  );
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + " " + country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMap,
  })) as Country[];
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => {};
  const handleChange = (key: keyof TripFormData, value: string | number) => {};

  const countries = loaderData as Country[];
  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI generated trips"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a country"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={(search) => {
                const query = search.text.toLowerCase();
                search.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter the duration for your trips in days (1, 5, 14, ...)"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => {
                //value shouldn't go <=0
                handleChange("duration", Number(e.target.value));
              }}
            />
          </div>
          {selectItems.map((key) => (
            <div key="key">
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(search) => {
                  const query = search.text.toLowerCase();
                  search.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
                className="combo-box"
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
