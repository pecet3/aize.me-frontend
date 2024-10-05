import { TrainingForm } from "./TrainingForm";

export default function Page({ params }: { params: { slug: string } }) {
  const modelTrainingUuid = params.slug;

  return (
    <main className="main-container">
      <TrainingForm modelTrainingUuid={modelTrainingUuid} />
    </main>
  );
}
