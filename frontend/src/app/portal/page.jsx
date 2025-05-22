import FirestoreForm from '../../components/Common/FirestoreForm';

export default function PortalPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <div className="max-w-2xl mx-auto">
        <FirestoreForm />
      </div>
    </div>
  );
} 