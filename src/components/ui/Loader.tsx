import { Spinner } from "@nextui-org/spinner";

const Loader = () => {
  return (
    <div className="flex gap-4">
      <Spinner color="default" />
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="danger" />
    </div>
  );
};

export default Loader;
