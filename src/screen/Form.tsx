import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, useTheme, Text, TextInput, Title} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

import {StackParams} from '../navegations/StackNavigator';

interface Props extends StackScreenProps<StackParams, 'Formulario'> {}

const Form = ({route}: Props) => {
  const {colors} = useTheme();
  const {activity} = route.params;

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  // const isFormValid = data => {
  //   let isValid = true;
  //   const {name, ci} = data;

  //   if (!name || name.trim().length === 0) {
  //     setHelperNameText('El nombre es requerido');
  //     setErrorName(true);
  //     isValid = false;
  //   } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
  //     setHelperNameText('El nombre no es válido');
  //     setErrorName(true);
  //     isValid = false;
  //   }
  //   if (!ci || ci.trim().length === 0) {
  //     setHelperCiText('La cédula es requerida');
  //     setErrorCi(true);
  //     isValid = false;
  //   } else if (
  //     (ci.trim().length !== 7 && ci.trim().length !== 8) ||
  //     !/^\d{7,8}$/.test(ci.trim())
  //   ) {
  //     setHelperCiText('La cédula no es válida');
  //     setErrorCi(true);
  //     isValid = false;
  //   }
  //   const isValidDate = moment(inputDateValue, 'DD/MM/yyyy').isAfter(moment());
  //   if (!inputDateValue || !isValidDate) {
  //     setHelperDateText('La fecha debe ser posterior al día actual');
  //     setErrorDate(true);
  //     isValid = false;
  //   }
  //   const startTime = moment('08:00', 'HH:mm');
  //   const endTime = moment('22:00', 'HH:mm');
  //   const isValidTime =
  //     moment(inputMomentValue, 'HH:mm').isSameOrAfter(startTime) &&
  //     moment(inputMomentValue, 'HH:mm').isSameOrBefore(endTime);
  //   if (!inputMomentValue || !isValidTime) {
  //     setHelperMomentText('La hora debe estar entre las 08:00 y 22:00');
  //     setErrorMoment(true);
  //     isValid = false;
  //   }

  //   return isValid;
  // };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.center}>
        <Title
          style={{
            color: colors.primary,
            padding: 10,
            textAlign: 'center',
          }}>
          Seleccione una actividad
        </Title>
        <TextInput
          label="Ingrese su nombre (solo letras)"
          value={''}
          style={styles.textInput}
        />
        <TextInput
          label="Ingrese su CI sin puntos ni guión"
          value={''}
          style={styles.textInput}
        />
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick single date
        </Button>
        <DatePickerModal
          // locale={'en'} optional, default: automatic
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          // validRange={{
          //   startDate: new Date(2021, 1, 2),  // optional
          //   endDate: new Date(), // optional
          // }}
          // onChange={} // same props as onConfirm but triggered without confirmed by user
          // saveLabel="Save" // optional
          // label="Select date" // optional
          // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        />
        <Button
          style={{
            backgroundColor: colors.primary,
            margin: 30,
          }}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          <Text
            style={{
              color: '#FFFFFF',
            }}>
            Agendar
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    width: 320,
    height: 70,
    margin: 10,
    backgroundColor: 'transparent',
  },
});

export default Form;
