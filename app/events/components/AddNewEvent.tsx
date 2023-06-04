'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddNewEvent = ({
  eventLoca,
}: {
  eventLoca: { lat: number; long: number } | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post('/api/event', {
        ...data,
        lat: eventLoca ? eventLoca.lat : null,
        long: eventLoca ? eventLoca.long : null,
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
      <Input
        id="name"
        label="Name"
        type="text"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      <Input
        id="description"
        label="description"
        type="text"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <div>
        <Button disabled={isLoading} fullWidth type="submit">
          Add new event
        </Button>
      </div>
    </form>
  );
};

export default AddNewEvent;
