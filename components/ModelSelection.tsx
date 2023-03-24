"use client";

import { useId } from "react";
import useSWR from "swr";
import Select from "react-select";

const ModelSelection = () => {
  // Get all the Chat Engines or models from ChatGPT
  const fetchModels = () => fetch("/api/getModels").then((res) => res.json());
  const { data: models, error, isLoading } = useSWR("models", fetchModels);

  // Assign a default model and set the model based on the selected option
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        instanceId={useId()}
        defaultValue={model}
        placeholder={model}
        isSearchable
        menuPosition="fixed"
        classNames={{ control: () => "bg-[#434654] border-[#434654]" }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
