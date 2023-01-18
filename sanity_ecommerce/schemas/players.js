export default {
	name: "players",
	title: "Players",
	type: "document",
	fields: [
		{
			name: "image",
			title: "Image",
			type: "array",
			of: [{ type: "image" }],
			options: {
				hotspot: true,
			},
		},
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{name: "bgimage",
			title: "BgImage",
			type: "array",
			of: [{ type: "image" }],
			options: {
				hotspot: true,
			},
		},
	],
};