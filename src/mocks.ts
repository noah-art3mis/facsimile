import { Book } from './types.ts';


export const fakeBook: Book = {
    id: 'test',
    author: 'Brune Platour',
    title: 'Lorem ipsum dolor sit amet consectetur',
    pages: [
        {
            number: '999',
            content: [
                ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo rhoncus elementum. ',
                'Aenean ultricies urna vel augue consectetur, eu convallis leo aliquam. Sed ac dui porttitor, venenatis massa fermentum, ultricies odio. Mauris sapien sapien, lobortis non lobortis in, lobortis ut sapien. ',
                'Donec commodo, augue ac bibendum consectetur, mi nisi efficitur felis, et aliquam urna massa quis dolor. Nunc facilisis maximus eleifend. Duis viverra suscipit maximus. In in arcu erat. Vestibulum eget aliquet metus. Donec sit amet ullamcorper tellus, fringilla semper sem.',
                'Sed fringilla, neque id cursus feugiat, purus leo vehicula erat, a elementum lacus diam eu lacus. Nam commodo justo hendrerit est tempor, sit amet commodo mauris gravida. Nullam blandit dictum dui, ut congue orci mollis at. Fusce vitae porta velit, ac ultrices nisl. ',
                'Etiam sodales massa non ligula molestie, eget luctus purus scelerisque. Pellentesque sodales mauris sit amet sapien placerat, in molestie mi rhoncus. Pellentesque ante eros, lacinia id iaculis at, scelerisque vitae sem. Etiam eget sodales ex. In dictum dolor vitae ex dignissim euismod. Cras scelerisque, neque in facilisis imperdiet, quam mauris porta turpis, sed viverra ex leo non justo.',
                ' Suspendisse ac nisl at orci fringilla tempus et ut quam. Sed facilisis mi leo, quis fermentum orci convallis at. Nam hendrerit id felis eu porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque semper posuere eleifend. Mauris tortor ligula, pellentesque eu placerat nec, luctus et quam. ',
                'Fusce ullamcorper interdum mi ac blandit. Quisque ullamcorper viverra quam, id efficitur justo. Pellentesque ut gravida tortor. Vestibulum sed quam at elit vulputate tempus sed at arcu. Praesent quam leo, dignissim ut erat sed, aliquam dapibus enim. Aenean id pulvinar tortor. ',
            ],
        },
    ],
};
