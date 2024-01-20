import React, { useState } from 'react';
import { render as inkRender, Box, Text, Newline, useInput } from 'ink';
import Logo from './Logo.js'
import Template from './Template.js'

class UI {

    constructor() {

    }

    render(branches: Array<any>) {
        inkRender(<Template branches={branches} />)
    }

}
export default UI
