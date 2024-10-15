export default function AboutPage() {
    return (
      <div>
        <iframe
          src="/about.html" 
          style={{
            width: '100%',
            height: '100vh',
            border: 'none'
          }}
          title="About"
        ></iframe>
      </div>
    );
  }