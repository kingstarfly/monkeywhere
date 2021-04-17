import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/auth";
import { postSighting } from "../utils/fetcher";
import { useMutation, useQueryClient } from "react-query";

const ReportModal = ({
  isOpen,
  onClose,
  setCurrentMonkeyData,
  newLocation,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const auth = useAuth();

  // Access the client
  const queryClient = useQueryClient();
  // Mutations
  const sightingsMutation = useMutation(postSighting, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("sightings");
    },
  });

  const saveMonkeyData = ({ reportNumMonkeys, reportDescription }) => {
    // Todo: Submit details and save to database
    const timestamp = new Date().toISOString();
    const position = [newLocation.lat, newLocation.lng];

    const sightingData = {
      user_id: auth.user.uid,
      numMonkeys: reportNumMonkeys,
      description: reportDescription,
      position: position,
      timestamp: timestamp,
    };

    // Client-side update with react query
    sightingsMutation.mutate({
      id: new Date().toISOString(), // just to make it unique
      ...sightingData,
    });

    reset();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(saveMonkeyData)}>
          <ModalHeader>Monkey Spotted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>How many?</FormLabel>
              <Input
                type="number"
                {...register("reportNumMonkeys", {
                  required: true,
                  min: 1,
                  max: 50,
                })}
                placeholder=""
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Brief description</FormLabel>
              <Input
                {...register("reportDescription", { required: true })}
                placeholder="what, where, how?"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
