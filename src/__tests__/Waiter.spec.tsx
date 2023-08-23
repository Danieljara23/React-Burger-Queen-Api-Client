import * as ProductRepository from "../Services/ProductRepository";
import * as OrderRepository from "../Services/OrderRepository";
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IOrder, ORDER_STATUS } from '../Models/Order.d';
import { PRODUCT_TYPE } from '../Models/Product.d';
import Waiter from '../Pages/Waiter';
import React from "react";

describe('<Waiter />', () => {

	const anyFunction = () => { };

	test('Should make request with correct params on submit the order', async () => {
		jest.spyOn(ProductRepository, 'getProducts').mockImplementation(() => Promise.resolve([]));
		jest.spyOn(OrderRepository, 'createOrder').mockImplementation(() => Promise.resolve(true));
		const initialOrder: IOrder = {
			client: "Kvn",
			userId: 123,
			status: ORDER_STATUS.pending,
			dateEntry: "",
			products: [
				{
					product: {
						id: 9,
						name: "fries",
						price: 500,
						image: "",
						type: PRODUCT_TYPE.lunch,
						dateEntry: ""
					},
					qty: 3
				}
			],
		};
		const setOrderMsg = jest.fn();
		React.useState = jest.fn()
			.mockReturnValueOnce([[], anyFunction])
			.mockReturnValueOnce(["", setOrderMsg])
			.mockReturnValueOnce([PRODUCT_TYPE.breakfast, anyFunction])
			.mockReturnValueOnce([initialOrder, anyFunction])
			
		const {container} = render(<Waiter />)
		const submitButton = container.querySelector('form > button') as HTMLButtonElement;
		await userEvent.click(submitButton)
		// https://stackoverflow.com/questions/57025753/how-to-set-initial-state-for-usestate-hook-in-jest-and-enzyme
		expect(submitButton.innerHTML).toBe("Create new order");
		expect(OrderRepository.createOrder).toHaveBeenCalledWith(initialOrder)
		expect(setOrderMsg).toHaveBeenCalledWith("Your order has been created")
	})
})
