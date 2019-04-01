import React from 'react'

import Action from './Action'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: props.options,
            selectedOption: undefined,
            modalIsOpen: false
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (err) {

        }
    }

    componentDidUpdate(prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            console.log(json, this.state.options);
            localStorage.setItem('options', json)
        }
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }))
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]

        this.setState(() => ({
            selectedOption: option,
            modalIsOpen: true
        }))
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add option'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat([option])
        }))
    }

    handleCloseModal() {
        this.setState(() => ({
            modalIsOpen: false
        }))

        setTimeout(() => {
            this.setState(() => ({
                selectedOption: undefined
            }))
        }, 200)
    }

    render() {
        const subtitle = 'Put your decisions in the hands of a computer'

        return (
            <React.Fragment>
                <Header
                    subtitle={subtitle}
                />
                <main className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <section className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </section>
                </main>
                <OptionModal
                    close={this.handleCloseModal}
                    isOpen={this.state.modalIsOpen}
                    selectedOption={this.state.selectedOption}
                />
            </React.Fragment>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}