interface Selection {
    disabled: boolean;
    selected: boolean;
    label: string;
    code: string;
}

interface DropdownProps {
    defaultSelection: string;
    label: string;
    selections: Selection[];
    onChange(selection: Selection): void;
}

interface DropdownState {
}

class DropDown extends React.Component<DropdownProps, DropdownState> {
    constructor(props: DropdownProps) {
        super(props);
        this.state = {};
    }
    renderOption(selection: Selection) {
        return (
            <option value={selection.code}
                disabled={selection.disabled}>

                {selection.label}
            </option>
        );
    }

    render() {
        const options = this.props.selections.map(this.renderOption);
        return (
            <div>
                <label>{this.props.label}</label>
                <select>
                    {options}
                </select>
            </div>
        );
    }
}