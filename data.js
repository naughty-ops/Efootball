const playersData = {
  // Group A
  '200001': { 
    name: 'Babbill', 
    img: 'player1.jpg', 
    position: 1, 
    points: 1200,
    matchesPlayed: 5,
    matchesWon: 3,
    matchesDrawn: 2,
    matchesLost: 0,
    goalsScored: 20,
    goalsAgainst: 7,
    phone: '+918606054501',
    tournamentStats: {
      group: 'A',
      groupPosition: 1,
      groupPoints: 11,
      groupGoals: 20,
      groupGoalsAgainst: 7,
      goalDifference: +13
    }
  },
  '200002': { 
    name: 'Farhan', 
    img: 'player2.jpg', 
    position: 2, 
    points: 1100,
    matchesPlayed: 5,
    matchesWon: 3,
    matchesDrawn: 1,
    matchesLost: 1,
    goalsScored: 21,
    goalsAgainst: 10,
    phone: '+918606710605',
    tournamentStats: {
      group: 'A',
      groupPosition: 2,
      groupPoints: 10,
      groupGoals: 21,
      groupGoalsAgainst: 10,
      goalDifference: +11
    }
  },
  '200004': { 
    name: 'Fazil', 
    img: 'player4.jpg', 
    position: 3, 
    points: 1000,
    matchesPlayed: 6,
    matchesWon: 1,
    matchesDrawn: 1,
    matchesLost: 4,
    goalsScored: 10,
    goalsAgainst: 23,
    phone: '+916238577968',
    tournamentStats: {
      group: 'A',
      groupPosition: 3,
      groupPoints: 4,
      groupGoals: 10,
      groupGoalsAgainst: 23,
      goalDifference: -13
    }
  },
  '200003': { 
    name: 'Adwaith TM', 
    img: 'player3.jpg', 
    position: 4, 
    points: 900,
    matchesPlayed: 4,
    matchesWon: 1,
    matchesDrawn: 0,
    matchesLost: 3,
    goalsScored: 3,
    goalsAgainst: 14,
    phone: '+919847685202',
    tournamentStats: {
      group: 'A',
      groupPosition: 4,
      groupPoints: 3,
      groupGoals: 3,
      groupGoalsAgainst: 14,
      goalDifference: -11
    }
  },

  // Group B
  '200008': { 
    name: 'Athul', 
    img: 'player8.jpg', 
    position: 1, 
    points: 1200,
    matchesPlayed: 6,
    matchesWon: 3,
    matchesDrawn: 1,
    matchesLost: 2,
    goalsScored: 16,
    goalsAgainst: 15,
    phone: '+919744398012',
    tournamentStats: {
      group: 'B',
      groupPosition: 1,
      groupPoints: 10,
      groupGoals: 16,
      groupGoalsAgainst: 15,
      goalDifference: +1,
      isWinner: true
    }
  },
  '200006': { 
    name: 'Agraj', 
    img: 'player6.jpg', 
    position: 2, 
    points: 1100,
    matchesPlayed: 6,
    matchesWon: 2,
    matchesDrawn: 2,
    matchesLost: 2,
    goalsScored: 12,
    goalsAgainst: 11,
    phone: '+919207516227',
    tournamentStats: {
      group: 'B',
      groupPosition: 2,
      groupPoints: 8,
      groupGoals: 12,
      groupGoalsAgainst: 11,
      goalDifference: +1
    }
  },
  '200005': { 
    name: 'Midhlaj', 
    img: 'player5.jpg', 
    position: 3, 
    points: 1000,
    matchesPlayed: 6,
    matchesWon: 2,
    matchesDrawn: 2,
    matchesLost: 2,
    goalsScored: 11,
    goalsAgainst: 10,
    phone: '+918075774367',
    tournamentStats: {
      group: 'B',
      groupPosition: 3,
      groupPoints: 8,
      groupGoals: 11,
      groupGoalsAgainst: 10,
      goalDifference: +1
    }
  },
  '200007': { 
    name: 'Mirsab', 
    img: 'player7.jpg', 
    position: 4, 
    points: 900,
    matchesPlayed: 6,
    matchesWon: 1,
    matchesDrawn: 3,
    matchesLost: 2,
    goalsScored: 6,
    goalsAgainst: 9,
    phone: '+918590951651',
    tournamentStats: {
      group: 'B',
      groupPosition: 4,
      groupPoints: 6,
      groupGoals: 6,
      groupGoalsAgainst: 9,
      goalDifference: -3
    }
  },

  // Group C
  '200009': { 
    name: 'Shibin', 
    img: 'player9.jpg', 
    position: 1, 
    points: 1200,
    matchesPlayed: 6,
    matchesWon: 4,
    matchesDrawn: 1,
    matchesLost: 1,
    goalsScored: 16,
    goalsAgainst: 9,
    phone: '+919037506635',
    tournamentStats: {
      group: 'C',
      groupPosition: 1,
      groupPoints: 13,
      groupGoals: 16,
      groupGoalsAgainst: 9,
      goalDifference: +7
    }
  },
  '200011': { 
    name: 'Razal', 
    img: 'player11.jpg', 
    position: 2, 
    points: 1100,
    matchesPlayed: 6,
    matchesWon: 3,
    matchesDrawn: 0,
    matchesLost: 3,
    goalsScored: 13,
    goalsAgainst: 12,
    phone: '+919946899892',
    tournamentStats: {
      group: 'C',
      groupPosition: 2,
      groupPoints: 9,
      groupGoals: 13,
      groupGoalsAgainst: 12,
      goalDifference: +1
    }
  },
  '200010': { 
    name: 'Vishnu', 
    img: 'player10.jpg', 
    position: 3, 
    points: 1000,
    matchesPlayed: 5,
    matchesWon: 2,
    matchesDrawn: 1,
    matchesLost: 2,
    goalsScored: 9,
    goalsAgainst: 12,
    phone: '+919562346077',
    tournamentStats: {
      group: 'C',
      groupPosition: 3,
      groupPoints: 7,
      groupGoals: 9,
      groupGoalsAgainst: 12,
      goalDifference: -3
    }
  },
  '200012': { 
    name: 'Sreeraj', 
    img: 'player12.jpg', 
    position: 4, 
    points: 900,
    matchesPlayed: 5,
    matchesWon: 1,
    matchesDrawn: 0,
    matchesLost: 4,
    goalsScored: 7,
    goalsAgainst: 12,
    phone: '+919567383801',
    tournamentStats: {
      group: 'C',
      groupPosition: 4,
      groupPoints: 3,
      groupGoals: 7,
      groupGoalsAgainst: 12,
      goalDifference: -5
    }
  },

  // Group D
  '200016': { 
    name: 'Abhinav', 
    img: 'player16.jpg', 
    position: 1, 
    points: 1200,
    matchesPlayed: 6,
    matchesWon: 4,
    matchesDrawn: 2,
    matchesLost: 0,
    goalsScored: 12,
    goalsAgainst: 5,
    phone: '+918075320930',
    tournamentStats: {
      group: 'D',
      groupPosition: 1,
      groupPoints: 14,
      groupGoals: 12,
      groupGoalsAgainst: 5,
      goalDifference: +7
    }
  },
  '200014': { 
    name: 'Anshad', 
    img: 'player14.jpg', 
    position: 2, 
    points: 1100,
    matchesPlayed: 6,
    matchesWon: 3,
    matchesDrawn: 0,
    matchesLost: 3,
    goalsScored: 13,
    goalsAgainst: 6,
    phone: '+918078714327',
    tournamentStats: {
      group: 'D',
      groupPosition: 2,
      groupPoints: 9,
      groupGoals: 13,
      groupGoalsAgainst: 6,
      goalDifference: +7
    }
  },
  '200015': { 
    name: 'Riswan', 
    img: 'player15.jpg', 
    position: 3, 
    points: 1000,
    matchesPlayed: 5,
    matchesWon: 1,
    matchesDrawn: 2,
    matchesLost: 2,
    goalsScored: 5,
    goalsAgainst: 9,
    phone: '+918590281093',
    tournamentStats: {
      group: 'D',
      groupPosition: 3,
      groupPoints: 5,
      groupGoals: 5,
      groupGoalsAgainst: 9,
      goalDifference: -4
    }
  },
  '200013': { 
    name: 'Arjun', 
    img: 'player13.jpg', 
    position: 4, 
    points: 900,
    matchesPlayed: 5,
    matchesWon: 1,
    matchesDrawn: 0,
    matchesLost: 4,
    goalsScored: 4,
    goalsAgainst: 14,
    phone: '+918590184877',
    tournamentStats: {
      group: 'D',
      groupPosition: 4,
      groupPoints: 3,
      groupGoals: 4,
      groupGoalsAgainst: 14,
      goalDifference: -10
    }
  },

  // Group E
  '200019': { 
    name: 'Sayooj', 
    img: 'player19.jpg', 
    position: 1, 
    points: 1200,
    matchesPlayed: 6,
    matchesWon: 5,
    matchesDrawn: 1,
    matchesLost: 0,
    goalsScored: 16,
    goalsAgainst: 7,
    phone: '+918848367352',
    tournamentStats: {
      group: 'E',
      groupPosition: 1,
      groupPoints: 16,
      groupGoals: 16,
      groupGoalsAgainst: 7,
      goalDifference: +9
    }
  },
  '200018': { 
    name: 'Shajeeh', 
    img: 'player18.jpg', 
    position: 2, 
    points: 1100,
    matchesPlayed: 6,
    matchesWon: 4,
    matchesDrawn: 0,
    matchesLost: 2,
    goalsScored: 10,
    goalsAgainst: 6,
    phone: '+919995661924',
    tournamentStats: {
      group: 'E',
      groupPosition: 2,
      groupPoints: 9,
      groupGoals: 9,
      groupGoalsAgainst: 6,
      goalDifference: +3
    }
  },
  '200020': { 
    name: 'Muhsin', 
    img: 'player20.jpg', 
    position: 3, 
    points: 1000,
    matchesPlayed: 5,
    matchesWon: 1,
    matchesDrawn: 1,
    matchesLost: 3,
    goalsScored: 9,
    goalsAgainst: 13,
    phone: '+918848363602',
    tournamentStats: {
      group: 'E',
      groupPosition: 3,
      groupPoints: 4,
      groupGoals: 9,
      groupGoalsAgainst: 13,
      goalDifference: -4
    }
  },
  '200017': { 
    name: 'Shybin', 
    img: 'player17.jpg', 
    position: 4, 
    points: 900,
    matchesPlayed: 6,
    matchesWon: 1,
    matchesDrawn: 0,
    matchesLost: 5,
    goalsScored: 9,
    goalsAgainst: 17,
    phone: '+917994956722',
    tournamentStats: {
      group: 'E',
      groupPosition: 4,
      groupPoints: 3,
      groupGoals: 9,
      groupGoalsAgainst: 17,
      goalDifference: -8
    }
  }
};

// Player name to ID mapping
const playerNameToIdMap = {
  "Babbill": "200001", "Farhan": "200002", "Adwaith TM": "200003", "Fazil": "200004",
  "Midhlaj": "200005", "Agraj": "200006", "Mirsab": "200007", "Athul": "200008",
  "Shibin": "200009", "Vishnu": "200010", "Razal": "200011", "Sreeraj": "200012",
  "Arjun": "200013", "Anshad": "200014", "Riswan": "200015", "Abhinav": "200016",
  "Shybin": "200017", "Shajeeh": "200018", "Sayooj": "200019", "Muhsin": "200020"
};

// Tournament Standings Data
const tournamentStandings = {
  groups: [
    {
      groupName: "Group A",
      standings: [
        { position: 1, player: { id: "200001", name: "Babbill", image: "player1.jpg" }, stats: { played: 5, won: 3, drawn: 2, lost: 0, goalsFor: 20, goalsAgainst: 7, goalDifference: +13, points: 11 } },
        { position: 2, player: { id: "200002", name: "Farhan", image: "player2.jpg" }, stats: { played: 5, won: 3, drawn: 1, lost: 1, goalsFor: 21, goalsAgainst: 10, goalDifference: +11, points: 10 } },
        { position: 3, player: { id: "200004", name: "Fazil", image: "player4.jpg" }, stats: { played: 6, won: 1, drawn: 1, lost: 4, goalsFor: 10, goalsAgainst: 23, goalDifference: -13, points: 4 } },
        { position: 4, player: { id: "200003", name: "Adwaith TM", image: "player3.jpg" }, stats: { played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 14, goalDifference: -11, points: 3 } }
      ]
    },
    {
      groupName: "Group B",
      standings: [
        { position: 1, player: { id: "200008", name: "Athul", image: "player8.jpg", isWinner: true }, stats: { played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 16, goalsAgainst: 15, goalDifference: +1, points: 10 } },
        { position: 2, player: { id: "200006", name: "Agraj", image: "player6.jpg" }, stats: { played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 12, goalsAgainst: 11, goalDifference: +1, points: 8 } },
        { position: 3, player: { id: "200005", name: "Midhlaj", image: "player5.jpg" }, stats: { played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 11, goalsAgainst: 10, goalDifference: +1, points: 8 } },
        { position: 4, player: { id: "200007", name: "Mirsab", image: "player7.jpg" }, stats: { played: 6, won: 1, drawn: 3, lost: 2, goalsFor: 6, goalsAgainst: 9, goalDifference: -3, points: 6 } }
      ]
    },
    {
      groupName: "Group C",
      standings: [
        { position: 1, player: { id: "200009", name: "Shibin", image: "player9.jpg" }, stats: { played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 16, goalsAgainst: 9, goalDifference: +7, points: 13 } },
        { position: 2, player: { id: "200011", name: "Razal", image: "player11.jpg" }, stats: { played: 6, won: 3, drawn: 0, lost: 3, goalsFor: 13, goalsAgainst: 12, goalDifference: +1, points: 9 } },
        { position: 3, player: { id: "200010", name: "Vishnu", image: "player10.jpg" }, stats: { played: 5, won: 2, drawn: 1, lost: 2, goalsFor: 9, goalsAgainst: 12, goalDifference: -3, points: 7 } },
        { position: 4, player: { id: "200012", name: "Sreeraj", image: "player12.jpg" }, stats: { played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 7, goalsAgainst: 12, goalDifference: -5, points: 3 } }
      ]
    },
    {
      groupName: "Group D",
      standings: [
        { position: 1, player: { id: "200016", name: "Abhinav", image: "player16.jpg" }, stats: { played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 12, goalsAgainst: 5, goalDifference: +7, points: 14 } },
        { position: 2, player: { id: "200014", name: "Anshad", image: "player14.jpg" }, stats: { played: 6, won: 3, drawn: 0, lost: 3, goalsFor: 13, goalsAgainst: 6, goalDifference: +7, points: 9 } },
        { position: 3, player: { id: "200015", name: "Riswan", image: "player15.jpg" }, stats: { played: 5, won: 1, drawn: 2, lost: 2, goalsFor: 5, goalsAgainst: 9, goalDifference: -4, points: 5 } },
        { position: 4, player: { id: "200013", name: "Arjun", image: "player13.jpg" }, stats: { played: 5, won: 1, drawn: 0, lost: 4, goalsFor: 4, goalsAgainst: 14, goalDifference: -10, points: 3 } }
      ]
    },
    {
      groupName: "Group E",
      standings: [
        { position: 1, player: { id: "200019", name: "Sayooj", image: "player19.jpg" }, stats: { played: 6, won: 5, drawn: 1, lost: 0, goalsFor: 16, goalsAgainst: 7, goalDifference: +9, points: 16 } },
        { position: 2, player: { id: "200018", name: "Shajeeh", image: "player18.jpg" }, stats: { played: 6, won: 4, drawn: 0, lost: 2, goalsFor: 10, goalsAgainst: 6, goalDifference: +4, points: 12 } },
        { position: 3, player: { id: "200020", name: "Muhsin", image: "player20.jpg" }, stats: { played: 5, won: 1, drawn: 1, lost: 3, goalsFor: 9, goalsAgainst: 13, goalDifference: -4, points: 4 } },
        { position: 4, player: { id: "200017", name: "Shybin", image: "player17.jpg" }, stats: { played: 6, won: 1, drawn: 0, lost: 5, goalsFor: 9, goalsAgainst: 17, goalDifference: -8, points: 3 } }
      ]
    }
  ]
};