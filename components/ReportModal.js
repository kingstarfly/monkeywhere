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

  const saveMonkeyData = ({ reportNumMonkeys, reportDescription }) => {
    // Todo: Submit details and save to database

    setCurrentMonkeyData((prevState) => {
      // console.log(prevState);
      // console.log(newLocation);
      return [
        ...prevState,
        {
          id: (prevState.length + 1).toString(),
          numMonkeys: parseInt(reportNumMonkeys),
          timestamp: new Date().toISOString(),
          description: reportDescription,
          position: newLocation,
        },
      ];
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
