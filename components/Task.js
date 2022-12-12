import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Task = (props) => {

    return (
        <Text>
            {props.text}
        </Text>
    )
}

export default Task;