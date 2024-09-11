// src/pages/EmailVerification.js

import React from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EmailVerification = () => {
  const toast = useToast();
  const location = useLocation();
  const { email } = location.state || {};  // Retrieve the email passed from the signup page

  const handleResend = async () => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      await axios.post('/api/user/resend-verification', {email} , config);  //passed the email (received from the signup page to this route,becoz, iss route me ek controller save hai, which wants email to be sent to him via req.body), second argument of the axios post is an object(body ), so {} used
      toast({
        title: 'Verification Email Resent',
        description: 'A new verification email has been sent to your inbox.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      toast({
        title: 'Error Resending Email',
        description: error.response?.data?.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" minH="100vh">
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Check Your Email
        </Text>
        <Text mt={4}>
          A verification link has been sent to your email address. Please check your inbox and follow the instructions to verify your email.
        </Text>
        <Text mt={2}>
          If you don't see the email, please check your spam folder.
        </Text>
        <Button
          colorScheme="blue"
          mt={4}
          onClick={handleResend}
        >
          Resend Verification Email
        </Button>
      </Box>
    </VStack>
  );
};

export default EmailVerification;
