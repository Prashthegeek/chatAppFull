import { VStack, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const SuccessEmail = () => {
  const history = useHistory();

  return (
    <VStack spacing="20px" pt="50px">
      <Text fontSize="2xl" fontWeight="bold">
        Email Verified Successfully!
      </Text>
      <Button colorScheme="blue" onClick={() => history.push("/login")}>
        Go to Chat
      </Button>
    </VStack>
  );
};

export default SuccessEmail;
