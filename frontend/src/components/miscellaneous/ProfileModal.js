import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {   //if we are using this compoent/function  to wrap something(in sideDrawer we used ProfileModal to wrap MenuItem ), then at that time, while declaring the function/component (we need to pass children as well, so used accepted children (but, we never sent children from sideDrawer here as a prop but ,we accept that automatically))  )
  const { isOpen, onOpen, onClose } = useDisclosure();  //will control the opening and closing of the modal

  return (
    <>
      {children ? (  //well, we can use a component multiple times (reusability) , so, if the component is wrapping something(ie. this component has some child, the wrapped component is it's child) then Show the name of the children(which is passed(here it is actually a menuItem named My profile)) , if this part is not written , then inspite of being the part of MenuItem , My Profile won't be shown in the layout becoz,ProfileModal wraps that MyProfite MenuItem and if we don't determine what to do with the  child of ProfileModal(which is actually MenuItem named My Profile ), then it won't be shown in the layout, check by commenting this whole terniary operator
        <span onClick={onOpen}>{children}</span>
      ) 
      : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

  <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>


  <ModalOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Darker overlay , write just after Modal,it dims the background of the content (othe than modal)when modal is opened */}

  <ModalContent  //big box of modal that appears
    maxW={["80%", "75%", "70%", "40%"]}  // Adjusted the width for better responsiveness "80%": Width on small mobile screens."70%": Width on medium-sized devices like tablets."60%": Width on larger devices like small laptops."40%": Width on large screens like desktops.
    p={[3, 4, 6]}  // Adjusted padding for better spacing
    m={0}  // Removed margin to ensure modal fits better on mobile screens
    borderRadius="xl"
    boxShadow="xl"
    mx="auto"  // to make it centered
  > 
    <ModalHeader  //that appears at the top of the modal when opened
      fontSize={["lg", "xl", "2xl"]}
      fontWeight="bold"
      color="purple.600"
      textAlign="center"
    >
      {user.name}
    </ModalHeader>

    <ModalCloseButton color="purple.600" />  {/*header ke bagal me cross icon comes and when clicked on it, modal closes, provided by modal itself */}

    <ModalBody  //in between header and footer(main content comes here) (image and email(a text )is a part of it.)
      textAlign="center"
      fontSize={["sm", "md", "lg"]}
      fontWeight="medium"
    >
      <Image
        borderRadius="full"
        boxSize={["70px", "90px", "110px"]}  // Made the image size smaller for mobile
        src={user.pic}
        alt={user.name}
        mb={4}
        mx="auto"
        border="2px solid"
        borderColor="purple.600"
        boxShadow="md"
      />
      <Text
        fontFamily="Work Sans"
        fontSize={["sm", "md", "3xl"]}  //On smaller screens, it will be "sm" (small), on medium screens "md" (medium), and on larger screens "lg" (large).
        fontWeight="medium"
        mt={2}
      >
        Email: {user.email}
      </Text>
    </ModalBody>

    <ModalFooter justifyContent="center">  {/*third part, footer conatins the end part of the modal , has a close button to close the modal */}
      <Button
        variant="ghost"
        colorScheme="purple"
        _hover={{ bg: "gray.200" }}
        size={["sm", "md", "lg"]}
        onClick={onClose}
        px={6}
      >
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
};

export default ProfileModal;
