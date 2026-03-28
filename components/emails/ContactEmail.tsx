import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function ContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>New website inquiry from {name}</Preview>
      <Body
        style={{
          backgroundColor: "#f8f5ef",
          color: "#1f2933",
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            maxWidth: "560px",
            padding: "32px",
          }}
        >
          <Heading style={{ marginTop: 0 }}>New therapy website inquiry</Heading>
          <Section>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            <Text>
              <strong>Message:</strong>
            </Text>
            <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
