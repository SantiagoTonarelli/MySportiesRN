import moment from 'moment';
import React, {useContext, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Title, Text, useTheme, Paragraph} from 'react-native-paper';

import {ActivitiesContext} from '../context/ActivitiesContext';

const Calendar = () => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {activities, finishAdd, finishAddActivity} =
    useContext(ActivitiesContext);

  useEffect(() => {
    !finishAdd && finishAddActivity();
  }, [finishAdd]);

  return (
    <View style={styles.center}>
      <FlatList
        ListHeaderComponent={() =>
          activities && activities.length > 0 ? (
            <Title
              style={{
                color: colors.primary,
                margin: 5,
                textAlign: 'center',
              }}>
              Seleccione una actividad
            </Title>
          ) : null
        }
        data={activities}
        key={Math.floor(width / 320)}
        keyExtractor={a => a.name + a.date + a.ci}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text
            style={{
              flexGrow: 1,
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              color: colors.primary,
            }}>
            No tiene actividades agendadas
          </Text>
        )}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Cover source={item.activity.img} style={styles.cover} />
            <Card.Content>
              <Title style={styles.title}>{item.activity.title}</Title>
              <Paragraph>
                {moment(item.date).format('DD/MM/yyyy HH:mm')}
              </Paragraph>
            </Card.Content>
          </Card>
        )}
        numColumns={Math.floor(width / 320)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cover: {
    width: 300,
  },
  title: {
    marginTop: 10,
    fontSize: 21,
  },
});

export default Calendar;
