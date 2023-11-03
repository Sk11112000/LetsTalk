
import { AlertIcon } from '@chakra-ui/react';
import { Formik, Form, useField } from 'formik';
import {Button,Stack,Input,FormLabel,Alert} from '@chakra-ui/react'
const MyTextInput = ({ label, ...props }) => {
   
    const [field, meta] = useField(props);
    return (
      <>
        <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
        <Input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <Alert className="error" status={"error"} mt={"2px"}>
              <AlertIcon></AlertIcon>
              {meta.error}</Alert>
        ) : null}
      </>
    );
  };
  export default MyTextInput;