import { VStack, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const NotSucEmail = () => {
  const history = useHistory();

  return (
    <VStack spacing="20px" pt="50px">
      <Text fontSize="2xl" fontWeight="bold">
        Email Verification Failed.
      </Text>
      <Button colorScheme="blue" onClick={() => history.push("/")}>
        Go Back to Signup
      </Button>
    </VStack>
  );
};

export default NotSucEmail;
