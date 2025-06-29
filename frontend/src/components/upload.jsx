export default function Upload() {
  return (
    <div>
      <h3>Upload Resume (.pdf or .docx)</h3>
      <input type="file" accept=".pdf,.docx" />
      <p>(Parsing simulated with dummy content)</p>
    </div>
  );
}